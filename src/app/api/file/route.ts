import { generateYTFileDescriptionChain, generateYTFileNameChain } from '@/services/chain-service';
import { addPdfDocument, addYoutubeDocument } from '@/services/document-service';
import { createFile, updateFile } from '@/services/file-service';

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();
  const userId = formData.get('userId') as string;
  const contextId = formData.get('contextId') as string;
  const type = formData.get('type');
  const youtubeLink = formData.get('link');

  try {
    if (type === 'youtube') {
      const url = youtubeLink as string;
      const fileId = await createFile({
        user_id: userId,
        context_id: contextId,
        name: 'Youtube Video',
        description: 'Youtube Video',
        file_type: 'youtube',
      });
      await addYoutubeDocument({ links: [url], userId, contextId, fileId });
      const newDocumentName = await generateYTFileNameChain(contextId, fileId);
      const newDocumentDescription = await generateYTFileDescriptionChain(contextId, fileId);
      if (newDocumentName) {
        await updateFile(fileId, { name: newDocumentName, description: newDocumentDescription });
      }
      return Response.json({ success: true });
    } else if (type === 'pdf') {
      const file = formData.get('file');
      if (!file) {
        return Response.json({ error: 'No files received.' }, { status: 400 });
      }
      const fileBlob = new Blob([file]);
      await addPdfDocument({ file: fileBlob, userId, contextId });
      return Response.json({ success: true });
    }
  } catch (error) {
    return Response.json({ error: 'Error processing youtube video' }, { status: 500 });
  }
}

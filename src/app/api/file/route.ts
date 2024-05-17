import { addPdfDocument, addYoutubeDocument } from '@/services/document-service';

export async function POST(req: Request, res: Response) {
  // const { userId, contextId, data, type } = await req.json();
  const formData = await req.formData();
  const userId = formData.get('userId') as string;
  const contextId = formData.get('contextId') as string;
  const data = formData.get('data');
  const type = formData.get('type');
  const file = formData.get('file');

  if (type === 'youtube') {
    const url = file as string;
    await addYoutubeDocument({ links: [url], userId, contextId });
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
}

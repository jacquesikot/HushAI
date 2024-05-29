import { supabaseAdminClient } from '@/lib/supabase';
import ApiError from '@/utils/ApiError';
import httpStatus from 'http-status';

interface CreateFile {
  user_id: string;
  context_id: string;
  name: string;
  description: string;
  file_type: 'youtube' | 'pdf';
}

export const createFile = async (newFile: CreateFile): Promise<string> => {
  try {
    const file = await supabaseAdminClient
      .from('file')
      .insert({
        user_id: newFile.user_id,
        context_id: newFile.context_id,
        name: newFile.name,
        description: newFile.description,
        file_type: newFile.file_type,
      })
      .select('id');

    if (file.error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error creating file');
    }

    return file.data[0].id.toString();
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error creating file');
  }
};

export const updateFile = async (fileId: string, updates: { name?: string; description?: string }) => {
  try {
    const file = await supabaseAdminClient.from('file').update(updates).match({ id: fileId });

    if (file.error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error updating file');
    }

    return file;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error updating file');
  }
};

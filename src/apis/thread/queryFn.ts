import api from "@/apis/core";

import { Thread } from "@/types/thread.ts";

interface DefaultThreadRequest {
  title: string; // JSON.stringify(CustomBody)
  image: null;
}

interface CreateThread extends DefaultThreadRequest {
  channelId: string;
}

interface PatchThread extends DefaultThreadRequest {
  postId: string;
}

export const createThread = async (postInfo: CreateThread) => {
  return await api.post<Thread>({ url: `/posts/create`, data: postInfo });
};

export const patchThread = async (postInfo: PatchThread) => {
  return await api.put<Thread>({ url: `/posts/update`, data: postInfo });
};

export const getThreadsByChannelId = (channelId: string) =>
  api.get<Thread[]>({ url: `/posts/channel/${channelId}` });

export const getThreadByThreadId = (threadId: string) =>
  api.get<Thread>({ url: `/posts/${threadId}` });

export const deleteThread = (threadId: string) => {
  return api.delete<Thread>({ url: `/posts/delete`, data: { id: threadId } });
};

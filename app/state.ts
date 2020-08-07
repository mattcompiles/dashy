import { atom } from 'recoil';

interface Repo {
  owner: string;
  name: string;
}

export const reposState = atom<Array<Repo>>({
  key: 'repos',
  default:
    typeof localStorage === 'object'
      ? JSON.parse(localStorage.getItem('repos') ?? '[]')
      : [],
});

export const tokenState = atom<string | undefined>({
  key: 'token',
  default:
    typeof localStorage === 'object'
      ? localStorage.getItem('githubToken') ?? undefined
      : undefined,
});

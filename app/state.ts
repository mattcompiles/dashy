import { atom } from 'recoil';

interface Repo {
  type: 'repo';
  owner: string;
  name: string;
}

interface Issue {
  type: 'issue';
  repoOwner: string;
  repoName: string;
  issue: number;
}

export const tilesState = atom<Array<Repo | Issue>>({
  key: 'tiles',
  default:
    typeof localStorage === 'object'
      ? JSON.parse(localStorage.getItem('tiles') ?? '[]')
      : [],
});

export const tokenState = atom<string | undefined>({
  key: 'token',
  default:
    typeof localStorage === 'object'
      ? localStorage.getItem('githubToken') ?? undefined
      : undefined,
});

export const lastFetchState = atom<Date>({
  key: 'fetchKey',
  default: new Date(),
});

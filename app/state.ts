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

import type { StoredNotableEncounter } from '../data/siteContentTypes';

/** Keep remote entries when the admin session is missing posts (partial publish). */
export function unionNotableEncounters(
  remote: StoredNotableEncounter[] | undefined,
  local: StoredNotableEncounter[] | undefined,
): StoredNotableEncounter[] {
  const remoteList = remote ?? [];
  const localList = local ?? [];
  if (!remoteList.length) return localList;
  if (localList.length >= remoteList.length) return localList;

  const byId = new Map<string, StoredNotableEncounter>();
  for (const item of remoteList) byId.set(item.id, item);
  for (const item of localList) byId.set(item.id, item);

  const order: string[] = [];
  for (const item of remoteList) {
    if (byId.has(item.id)) order.push(item.id);
  }
  for (const item of localList) {
    if (!order.includes(item.id)) order.push(item.id);
  }
  return order.map((id) => byId.get(id)!);
}

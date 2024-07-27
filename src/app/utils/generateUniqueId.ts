export default function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36);
}

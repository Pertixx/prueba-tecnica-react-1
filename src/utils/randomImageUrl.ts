export default function getRandomImageUrl(text?: string): string {
  const baseUrl = 'https://dummyjson.com/image/400x200/282828?fontFamily=pacifico';
  return text ? `${baseUrl}&text=${encodeURIComponent(text)}` : baseUrl;
}
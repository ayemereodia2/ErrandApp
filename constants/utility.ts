
export function getTimeDiff(created_at: string): string {
    const current = new Date();
    const createdAt = new Date(created_at);
  
    const timeDifference = current.getTime() - createdAt.getTime();
  
    const milliseconds = Math.floor(timeDifference);
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30)
  
    if (seconds < 60) return `${seconds} s`;

    if (minutes < 60) return `${minutes} m`
    
    if (hours < 24) return `${hours} h`;

    if (days < 30)  return `${days} d`;

    return `${months} mo`
}
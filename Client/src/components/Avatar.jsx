import { ClassValue } from 'clsx'

import { cn } from '../lib/utils'

export default function Avatar({
  className,
  imageUrl,
  onClick
}) {
  return (
    <button
      role="button"
      aria-label="Click to perform an action"
      onClick={onClick}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className={cn(
        'h-16 w-16 rounded-full border-2 border-border dark:border-darkBorder bg-cover bg-center',
        className,
      )}
    ></button>
  )
}
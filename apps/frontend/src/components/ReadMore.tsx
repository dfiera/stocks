import { useState } from 'react';

export default function ReadMore({ text, maxLength }: {
  text: string
  maxLength: number
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const getTruncatedText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  return (
    <div className="inline">
      <span>
        {isExpanded
          ? text
          : getTruncatedText(text, maxLength)
        }
      </span>
      {text.length > maxLength && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline ml-1 text-blue-600 dark:text-blue-500"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

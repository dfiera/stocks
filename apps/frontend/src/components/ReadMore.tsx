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
    <>
      <p>
        {isExpanded
          ? text
          : getTruncatedText(text, maxLength)
        }
      </p>
      {text.length > length && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 dark:text-blue-500 mt-0.5"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </>
  );
}

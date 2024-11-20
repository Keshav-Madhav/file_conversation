import React, { ReactNode } from "react";
import { PlaceholdersAndVanishInputDemo } from "./acceternitycomponents/PlaceholdersAndVanishInputDemo";
import { FileUploadDemo } from "./acceternitycomponents/FileUploadDemo";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Chat = ({
  sortedChatData,
  setSortedChatData,
  setcurrChatData,
  currChatData,
  currActiveFile
}: {
  sortedChatData: ChatData[];
  setSortedChatData: React.Dispatch<React.SetStateAction<ChatData[]>>;
  setcurrChatData: React.Dispatch<React.SetStateAction<ChatData | undefined>>;
  currChatData: ChatData | undefined;
  currActiveFile: FileData;
}) => {
  // Custom components for ReactMarkdown
  const components = {
    // Default text wrapper to ensure all text has proper styling
    text: ({ children }: {children: ReactNode}) => <span className="text-white">{children}</span>,
    
    // Code block handling
    code({ inline, className, children, ...props }: {inline: boolean, className: string, children: ReactNode}) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      return !inline ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          className="rounded-md"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-neutral-700 px-1 rounded text-white" {...props}>
          {children}
        </code>
      );
    },
    // Style for paragraphs
    p: ({ children }: {children: ReactNode}) => <p className="mb-2 text-white">{children}</p>,
    // Style for headings
    h1: ({ children }: {children: ReactNode}) => <h1 className="text-2xl font-bold mb-4 text-white">{children}</h1>,
    h2: ({ children }: {children: ReactNode}) => <h2 className="text-xl font-bold mb-3 text-white">{children}</h2>,
    h3: ({ children }: {children: ReactNode}) => <h3 className="text-lg font-bold mb-2 text-white">{children}</h3>,
    // Style for lists
    ul: ({ children }: {children: ReactNode}) => <ul className="list-disc ml-4 mb-4 text-white">{children}</ul>,
    ol: ({ children }: {children: ReactNode}) => <ol className="list-decimal ml-4 mb-4 text-white">{children}</ol>,
    // Style for blockquotes
    blockquote: ({ children }: {children: ReactNode}) => (
      <blockquote className="border-l-4 border-neutral-500 pl-4 italic my-4 text-white">
        {children}
      </blockquote>
    ),
  };

  return (
    <div
      className={`${
        currChatData === undefined ? "w-[100%]" : "w-[50%]"
      } h-full flex flex-col justify-between border-white/20 border-[0.5px] rounded-lg`}
    >
      {currChatData === undefined ? (
        <div className="flex justify-center items-center w-full h-full">
          <FileUploadDemo
            setcurrChatData={setcurrChatData}
            currChatData={currChatData}
            sortedChatData={sortedChatData}
            setSortedChatData={setSortedChatData}
          />
        </div>
      ) : (
        <>
          <p className="text-center text-2xl font-bold sticky h-12 leading-10 text-white">
            {currActiveFile.file_name}
          </p>
          <div className="mx-10 flex flex-col gap-4 overflow-y-auto h-[calc(100%-9rem)] rounded-lg">
            {currChatData.question_hist.map((qs, subindex) => (
              <div key={subindex} className="flex flex-col gap-2">
                {/* Question */}
                {qs === "" ? null : (
                  <div className="max-w-[80%] w-fit flex justify-end self-end">
                    <div className="bg-neutral-400/50 px-3 pt-1 rounded-lg border-white/20 border-[0.5px] w-full">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        // @ts-expect-error - `components` is not a valid prop
                        components={components}
                        className="text-white"
                      >
                        {qs}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
                {/* Answer */}
                {currChatData.answer_hist[subindex] === "" ? null : (
                  <div className="max-w-[80%] w-fit flex justify-start">
                    <div className="bg-neutral-400/50 px-3 pt-1 rounded-lg border-white/20 border-[0.5px] w-full">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        // @ts-expect-error - `components` is not a valid prop
                        components={components}
                        className="text-white"
                      >
                        {currChatData.answer_hist[subindex]}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="relative w-[100%] h-20 flex items-center p-4 justify-center gap-4">
            {currChatData && (
              <PlaceholdersAndVanishInputDemo
                currChatData={currChatData}
                setCurrChatData={setcurrChatData}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
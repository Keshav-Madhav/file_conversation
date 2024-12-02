import Image from 'next/image';

type props = {
  currChatData: ChatData | undefined;
  currActiveFile: FileData;
};

const FileDisplay = ({ currChatData, currActiveFile }: props) => {
  const showFile = () => {
    return (
      !currChatData ||
      currChatData.file_hash !== currActiveFile?.file_id ||
      currActiveFile?.file_path_relative === "" ||
      !["pdf", "png", "jpeg", "jpg"].includes(
        currActiveFile?.file_name?.split(".").pop()?.toLowerCase() ?? ""
      )
    );
  };

  const isImageFile = () => {
    const fileExtension = currActiveFile?.file_name?.split(".").pop()?.toLowerCase() ?? "";
    return ["png", "jpeg", "jpg"].includes(fileExtension);
  };

  if (showFile()) {
    // Do not render anything if showFile is true
    return null;
  }

  return (
    <div
      className={`min-w-[35%] max-w-[35%] h-full flex flex-col border-white/20 bg-stone-100/2 border-[0.5px] rounded-lg`}
    >
      <div className="h-full w-full overflow-y-auto scroll-2">
        {isImageFile() ? (
          <Image
            className="h-full w-full rounded-lg"
            src={currActiveFile.file_path_relative}
            alt={currActiveFile.file_name}
            layout="responsive"
            width={500}
            height={500}
            objectFit="contain"
          />
        ) : (
          <iframe
            className="h-full w-full rounded-lg border-0"
            title="PDF Viewer"
            src={currActiveFile.file_path_relative + "#toolbar=0"}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default FileDisplay;

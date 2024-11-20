interface ChatData {
  id: string;
  file_hash: string;
  input_query: string;
  question_hist: string[];
  answer_hist: string[];
  timestamp: string;
}

interface FileData {
  file_id: string;
  file_name: string;
  file_path_relative: string;
  file_path: string;
}
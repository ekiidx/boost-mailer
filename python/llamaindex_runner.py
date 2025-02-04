import sys
import os
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core.settings import Settings

def main():
    if len(sys.argv) < 2:
        print("❌ Usage: python llamaindex_runner.py /full/path/to/your/file.txt")
        sys.exit(1)

    file_path = os.path.abspath(sys.argv[1])  # 🔄 Get full absolute path

    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        sys.exit(1)

    print(f"📂 Reading file: {file_path}")

    # Set up HuggingFace embedding model (local, no OpenAI needed)
    Settings.embed_model = HuggingFaceEmbedding(model_name="all-MiniLM-L6-v2")

    # Load and index the file
    reader = SimpleDirectoryReader(input_files=[file_path])
    docs = reader.load_data()
    index = VectorStoreIndex.from_documents(docs)

    print("✅ Index built successfully!")

if __name__ == "__main__":
    main()

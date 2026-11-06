
import { useEffect, useState } from "react";
import { Video, X } from "lucide-react";

interface VideoUploadProps {
  onVideoChange: (file: File | null) => void;
}

export default function VideoUpload({
  onVideoChange
}: VideoUploadProps) {
  const [video, setVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!video) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(video);

    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [video]);

  function handleVideoChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Seleciona um vídeo válido");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      alert("O vídeo não pode ultrapassar 100MB");
      return;
    }

    setVideo(file);
    onVideoChange(file);
  }

  function removeVideo() {
    setVideo(null);
    onVideoChange(null);
  }

  return (
    <div className="space-y-4">

      <label className="block text-sm font-medium">
        Vídeo do imóvel
      </label>

      {!video && (
        <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 cursor-pointer hover:bg-gray-50">

          <Video size={32} className="text-gray-400" />

          <span className="mt-3 text-sm text-gray-600">
            Selecionar vídeo
          </span>

          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="hidden"
          />

        </label>
      )}

      {preview && (
        <div className="relative">

          <video
            src={preview}
            controls
            className="w-full rounded-2xl"
          />

          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
          >
            <X size={18} />
          </button>

          <p className="text-sm text-gray-500 mt-2">
            {video?.name}
          </p>

        </div>
      )}

    </div>
  );
}

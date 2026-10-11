import { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus, Trash2, Upload } from "lucide-react";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSize = 5 * 1024 * 1024;

const AddProductImages = ({ image, onImageChange, disabled = false }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!image) {
      setPreviewUrl("");
      if (inputRef.current) inputRef.current.value = "";
      return undefined;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const chooseImage = (file) => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setError("Choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > maxImageSize) {
      setError("Image must be 5 MB or smaller.");
      return;
    }

    setError("");
    onImageChange(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    chooseImage(event.dataTransfer.files[0]);
  };

  const removeImage = () => {
    setError("");
    onImageChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section className="rounded-xl border border-[#E2EDF1] bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3 border-b border-[#EEF3F5] pb-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E5F6F0] text-[#15966F]">
          <Camera size={19} />
        </span>
        <div>
          <h2 className="text-base font-semibold text-[#17324D]">Product images</h2>
          <p className="mt-0.5 text-sm text-[#718096]">Add one clear primary image for this product.</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        aria-label="Choose product image"
        disabled={disabled}
        onChange={(event) => chooseImage(event.target.files[0])}
      />

      {!image ? (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed px-4 py-6 text-center transition ${dragging ? "border-[#15966F] bg-[#F1F9F6]" : "border-[#C9DCE4] bg-[#F8FBFC]"}`}
        >
          <Upload size={25} className="mb-2 text-[#237DA8]" aria-hidden="true" />
          <p className="text-sm font-semibold text-[#17324D]">Drop an image here</p>
          <p className="mt-1 text-xs text-[#718096]">JPG, PNG, or WebP, up to 5 MB</p>
          <button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-[#15966F] bg-white px-4 text-sm font-semibold text-[#117F5E] transition hover:bg-[#E5F6F0] disabled:opacity-50"
          >
            <ImagePlus size={17} aria-hidden="true" />
            Choose Images
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-[#15966F] bg-[#F8FBFC]">
            {previewUrl && <img src={previewUrl} alt="Primary product preview" className="h-full w-full object-cover" />}
            <span className="absolute left-2 top-2 rounded-full bg-[#15966F] px-2.5 py-1 text-xs font-semibold text-white">
              Primary
            </span>
            <button
              type="button"
              disabled={disabled}
              onClick={removeImage}
              aria-label="Remove product image"
              title="Remove image"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-red-700 shadow-sm hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    </section>
  );
};

export default AddProductImages;

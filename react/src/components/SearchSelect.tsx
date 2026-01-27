import Select from "react-select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Option } from "../features/uploads/upload.types";
import { fetchAllFiles } from "../features/uploads/upload.api";

function SearchSelect() {
  const [options, setOptions] = useState<Option[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllFiles().then(files =>
      setOptions(
        files.map(file => ({
          label: file.originalName,
          value: file.id,
          folderId: file.folderId,
        }))
      )
    );
  }, []);

  return (
    <div className="w-80">
      <Select
        placeholder="Search files"
        options={options}
        onChange={option => {
          if (!option) return;
          navigate(`/folders/${option.folderId}`);
        }}
        styles={{
          control: base => ({
            ...base,
            borderRadius: "8px",
            minHeight: "36px",
          }),
        }}
      />
    </div>
  );
}

export default SearchSelect;

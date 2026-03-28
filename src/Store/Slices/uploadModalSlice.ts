import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface UploadModalState {
  open: boolean;
  multiple: boolean;
  fieldName?: string;
  selected: string[];
  maxSelection?: number;
}

const initialState: UploadModalState = {
  open: false,
  multiple: false,
  fieldName: "",
  selected: [],
  maxSelection: undefined,
};

const uploadModalSlice = createSlice({
  name: "uploadModal",
  initialState,
  reducers: {
    openUploadModal: (state, action: PayloadAction<Omit<UploadModalState, "open">>) => {
      state.open = true;
      state.multiple = action.payload.multiple;
      state.fieldName = action.payload.fieldName;
      state.selected = action.payload.selected || [];
      state.maxSelection = action.payload.maxSelection;
    },
    closeUploadModal: (state) => {
      state.open = false;
      state.multiple = false;
      state.fieldName = "";
      state.selected = [];
      state.maxSelection = undefined;
    },
  },
});

export const { openUploadModal, closeUploadModal } = uploadModalSlice.actions;
export default uploadModalSlice.reducer;
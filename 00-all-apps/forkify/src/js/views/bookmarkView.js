import {PreviewView} from "./previewView";

class BookmarkView extends PreviewView {
  constructor() {
    const parentElement = document.querySelector('.bookmarks__list');
    super(parentElement, '', 'No bookmarks so far');
  }
}

export default new BookmarkView();
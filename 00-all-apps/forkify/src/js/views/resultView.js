import {PreviewView} from "./previewView";

class ResultView extends PreviewView {
  constructor() {
    const parentElement = document.querySelector('.results');
    super(parentElement, '', 'No luck getting recipes!');
  }
}

export default new ResultView();
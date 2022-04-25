import { LaicodeWebView } from "./laicodeWebView";

class LaicodePreviewProvider extends LaicodeWebView {
	protected getWebContents() {
		console.log("successful");
		return "";
    }
    
    public show() {
        
    }
}

export const laicodePreviewProvider: LaicodePreviewProvider = new LaicodePreviewProvider();

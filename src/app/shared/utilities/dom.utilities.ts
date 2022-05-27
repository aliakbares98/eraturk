export class DOMUtilities {
    static copyElementText(id: string): boolean {
        let element = document.getElementById(id);

        if (element) {
            var text = element.innerText;
            var elem = document.createElement("textarea");
            document.body.appendChild(elem);
            elem.value = text;
            elem.select();
            document.execCommand("copy");
            document.body.removeChild(elem);
            return true;
        } else {
            return false;
        }
    }
}
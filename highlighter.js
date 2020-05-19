function getPartsToHighlight() {
    return new Promise(resolve => chrome.runtime.sendMessage(
        {contentScriptQuery: "queryDifference", source: window.location.toString()},
        resolve,
    ));
}

function tokensToRegexp(tokens) {
    return tokens.join('.+');
}

function tokensToString(tokens) {
    return tokens.join(' ');
}

function doSearch(text, backgroundColor) {
    if (window.find && window.getSelection) {
        document.designMode = "on";
        var sel = window.getSelection();
        sel.collapse(document.body, 0);

        while (window.find(text)) {
            document.execCommand("HiliteColor", false, backgroundColor);
            sel.collapseToEnd();
        }

        document.designMode = "off";
    }
}

function highlightParts() {
    getPartsToHighlight().then(partsDiffs => {
        partsDiffs = partsDiffs.filter(diff => diff.difference > 1);
        for (let part of partsDiffs) {
            doSearch(part.sentence, "yellow");
        }
    })
}

highlightParts();
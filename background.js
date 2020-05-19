chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.contentScriptQuery === "queryDifference") {
            const params = new URLSearchParams({ source: request.source });
            const url = `http://localhost:8000/articles/analytics?${params.toString()}`;

            fetch(url)
                .then(response => response.json())
                .then(article => sendResponse(article.cluster_difference_probs));

            return true;
        }
    }
)
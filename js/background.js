chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.query === "queryDifference") {
            const params = new URLSearchParams({ source: request.source });
            const url = `http://localhost:8000/articles/analytics?${params.toString()}`;

            fetch(url)
                .then(response => response.json())
                .then(article => {
                    chrome.storage.sync.set({"clusterId": article.cluster});
                    sendResponse(article.cluster_difference_probs);
                });
            
            return true;
        } else if (request.query === "fetchCluster") {
            chrome.storage.sync.get(["clusterId"], values => {
                const url = `http://localhost:8000/cluster/${values.clusterId}/`;

                fetch(url)
                    .then(response => response.json())
                    .then(cluster => chrome.storage.sync.set({"cluster": cluster}));
            });
        }
    }
)
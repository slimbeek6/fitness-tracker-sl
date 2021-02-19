let db;

const request = indexedDB.open("Workouts", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = event => {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = event => {
    console.log("Unable to Connect to DB :" + event.target.errorCode);
};

function saveRecord(record) {
    // create a transaction on the pending db with readwrite access
    const transaction = db.transaction(["pending"], "readwrite");
  
    // access your pending object store
    const store = transaction.objectStore("pending");
  
    // add record to your store with add method.
    store.add(record);
}



function checkDatabase() {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    const getAll = store.getAll();

    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
            fetch("/api/workout/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(function() {
                const transaction = db.transaction(["pending"], "readwrite");
                const store = transaction.objectStore("pending");
                store.clear();
            });
        }
    }
}

window.addEventListener("online", checkDatabase);
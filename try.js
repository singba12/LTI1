function getCoordinates(callback) {
    if (!navigator.geolocation) {
        console.error("La géolocalisation n'est pas supportée par ce navigateur.");
        console.log("Votre navigateur ne supporte pas la géolocalisation.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        position => callback({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }),
        error => console.error("Erreur lors de l'obtention des coordonnées :", error),
        { enableHighAccuracy: true }
    );
}

// Fonction pour capturer les coordonnées GPS
async function capterGPS() {
    return new Promise((resolve, reject) => {
        getCoordinates(coords => {
            if (coords) {
                console.log(coords);
                resolve(coords);
            } else {
                reject(new Error("Impossible d'obtenir les coordonnées."));
            }
        });
    })
    .then(coords => JSON.stringify(coords)) // Transformer en JSON si nécessaire
    .catch(error => {
        console.error("Erreur :", error.message);
        console.log("Impossible de vous localiser. Veuillez vous mettre dehors et activer votre géolocalisation.");
    });
}

// Exemple d'utilisation
capterGPS().then(coordsJson => {
    if (coordsJson) {
        console.log("Coordonnées en JSON :", coordsJson);
    }
});
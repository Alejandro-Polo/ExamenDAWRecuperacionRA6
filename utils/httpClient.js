
export default async function GetFech(url) {
    const datosapi = await fetch(url);
    const sacarjson = await datosapi.json();
    return(sacarjson.amiibo);
}

import React from "react";
//CUSTOM HOOK
function useLocalStorage (itemName, initialValue){
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    // el estado(use) tiene dos parametros
    // estado inicial de los Item
    const [item, setItem]  = React.useState (initialValue);

    React.useEffect(()  => {
        setTimeout(() => {
        try {
            const localStorageItem = localStorage.getItem(itemName);
            let parsedItem;

            if(!localStorageItem){
            localStorage.setItem(itemName, JSON.stringify(initialValue));
            parsedItem = initialValue;
            }else {
            parsedItem = JSON.parse(localStorageItem);
            }
            setItem(parsedItem);
            setLoading(false);

        }catch(error){
            setError(error);
        }
        }, 1000)
        console.log('usefect')
    }, [])

  // esta funcion sirve como puente ya que actualiziara los Item creados y el local storage
  const saveItem = (newItem) => {
    // convertimos los Item recibidos en formato json y los  guardamos
   try {
    const stringifiedItem = JSON.stringify(newItem);
    // agregamos los Item al local storage en la variable Item-V1 q es un array
    localStorage.setItem(itemName ,stringifiedItem);
    // le enviamos los Item al estado
    setItem(newItem);
   } catch (error) {
    setError(error)
   }
  };

  return {
    item,
    saveItem,
    loading,
    error,
  };
}


export { useLocalStorage };
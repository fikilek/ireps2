export const useLocalStorage = key => {
	const setItem = value => {
		// console.log(`setting values at key :`, key);
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.log(`Error localStorage setting item: `, error.message);
		}
	};
	const getItem = key => {
    // console.log(`getting values from key :`, key);
    try {
      const localstorageData = window.localStorage.getItem(key);
        return localstorageData? JSON.parse(localstorageData): null ;
    } catch (error) {
      console.log(`Error localStorage getting item from key [${key}] : `, error.message )
    }
	};

	const deleteItem = key => {
		console.log(`deleting values from key :`, key);
		try {
			const result = window.localStorage.removeItem(key)
			return result
		} catch (error) {
			console.log(
				`Error localStorage deleting item on key [${key}] : `,
				error.message
			);
		}
	}

	return { setItem, getItem, deleteItem };
};

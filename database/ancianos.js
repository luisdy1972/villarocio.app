async function buscarAnciano(id) {
	const ancianoRef = doc(db, 'ancianos', id)
	const q = query(ancianoRef)
	const QuerySnapshot = await getDoc(q)
	return QuerySnapshot.data()
}

export { buscarAnciano }

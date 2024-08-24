const { createStore } = require("@reduxjs/toolkit");

export const reducerForMock = () => {
    const mockReducer = (state = { theme: { theme: 'light' } }, action) => state;
    return createStore(mockReducer);
}

export const generateTestData = (count) => {
    let datas = []
    for (let i = 0; i < count; i++) {
        let data = { 
            id: i+1, name: `Card ${i+1}`, release_date: `0${i+1}-01-1999`, rating: 1.2, 
            poster_path: `public\\img\\img${i+1}`, categories: [{ name: "Category 1" }, {name: "Category 2" }] 
        }
        datas.push(data);        
    }
    return (count === 1) ? datas[0] : datas;
}

export const generateObjectArray = (name, count) => {
    let datas = []
    for (let i = 0; i < count; i++)
        datas.push({ id: i+1, name: `${name} ${i+1}` });
    return (count === 1) ? datas[0] : datas;
}
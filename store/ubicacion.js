export const state = () =>({
    id: '',  
    pais: '',
    codigo: '',
    codigo2:'',
    codigofe:''
})

export const mutations = () =>({
    storeId : (state, data)=>{
        state.Id = data
    },
    storePais : (state, data)=>{
        state.Pais = data
    },
    storeCodigo : (state, data)=>{
        state.Codigo = data
    },
    storeCodigo2 : (state, data)=>{
        state.Codigo2 = data
    },
    storeCodigofe : (state, data)=>{
        state.Codigofe = data
    }
})
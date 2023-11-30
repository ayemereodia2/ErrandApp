import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import Toast from 'react-native-toast-message'
import { _fetch } from "../axios/http"

interface Props {
  toggleAddAccountModal: (open: boolean) => void
    accNum: string 
    accName: string
    bankCode: any
    setLoading: (nval: boolean) => void
}

export const addAccount = createAsyncThunk("add-Account", async ({ accName, accNum, bankCode, setLoading, toggleAddAccountModal }: Props, { rejectWithValue }) => {
  
    try {
       const rs = await _fetch({ method:'POST',  _url:'/user/bank-account', body: {
            account_name: accName,
            account_number: accNum,
            bank_code: bankCode
        }
       })
      const _rs = await rs.json()

      
      Toast.show({ type: 'success', text1: "Bank Account added successfully" })
      toggleAddAccountModal && toggleAddAccountModal(false)
    } catch (err) {
      if (err instanceof AxiosError) {
          Toast.show({type: 'error', text1: err.response?.data.message,})
          return rejectWithValue(err)
        }
    } finally {
        setLoading(false)
    }
})
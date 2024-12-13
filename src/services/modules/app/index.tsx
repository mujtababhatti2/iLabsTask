import NavigationService from "../../../navigators/NavigationService";
import { setToken } from "../../../store/auth";
import { setLoading } from "../../../store/loader";
import { showCustomAlert, showError } from "../../../utils/HelperFuctions";
import { api } from "../../api";

export interface GetApiResponse {
  messages: string[];
  result: Sector[];
  statusCode: number;
  version: string;
}

interface PostApiResponse {
  messages: string[];
  result: any;
  statusCode: number;
  version: string;
}

export interface Sector {
  key: number;
  label: string;
  value: string;
}

interface body {}

export const bodyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSendingCountries: build.mutation<GetApiResponse, void>({
      query: () => ({
        url: `Country/SendingCountries`,
        method: "GET",
      }),
    }),
    getDeliveryMethods: build.mutation<GetApiResponse, void>({
      query: () => ({
        url: `Transaction/GetDeliveryMethods`,
        method: "GET",
      }),
    }),
    getpaymentmethod: build.mutation<GetApiResponse, void>({
      query: () => ({
        url: `Transaction/GetPaymentMethods`,
        method: "GET",
      }),
    }),
    getReceivingCountries: build.mutation<GetApiResponse, void>({
      query: () => ({
        url: `Country/ReceivingCountries`,
        method: "GET",
      }),
    }),
    getAllCountries: build.mutation<GetApiResponse, void>({
      query: () => ({
        url: `Country/GetAllCountries`,
        method: "GET",
      }),
    }),
    getBeneficiaries: build.mutation<GetApiResponse, { user: any }>({
      query: ({ user }) => ({
        url: `Beneficiary/BeneficiariesByUserId?userId=${user}`,
        method: "GET",
      }),
    }),
    getIdentification: build.mutation<GetApiResponse, void>({
      query: () => ({
        url: `Transaction/GetIdentitficationTypes`,
        method: "GET",
      }),
    }),
    getTransactionsPurposes: build.mutation<GetApiResponse, void>({
      query: () => ({
        url: `Transaction/GetAllTransactionPurposes`,
        method: "GET",
      }),
    }),
    addIdentification: build.mutation<PostApiResponse, body>({
      query: (body) => ({
        url: "Transaction/AddUserIdentification", // Adjust the endpoint URL as needed
        method: "POST",
        body,
      }),
    }),
    createBeneficiary: build.mutation<PostApiResponse, body>({
      query: (body) => ({
        url: "Beneficiary/CreateBeneficiary", // Adjust the endpoint URL as needed
        method: "POST",
        body,
      }),
    }),
    initiateTransaction: build.mutation<PostApiResponse, body>({
      query: (body) => ({
        url: "Transaction/InitiateTransfer", // Adjust the endpoint URL as needed
        method: "POST",
        body,
      }),
    }),
    PayInitiateTransaction: build.mutation<PostApiResponse, body>({
      query: (body) => ({
        url: "Transaction/PayNow", // Adjust the endpoint URL as needed
        method: "POST",
        body,
      }),
    }),
    getDetailsbyReferenceNumber: build.mutation<GetApiResponse, { rf: any }>({
      query: ({ rf }) => ({
        url: `Transaction/GetTransactionByReferenceNumber?referenceNumber=${rf}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetSendingCountriesMutation,
  useGetDeliveryMethodsMutation,
  useGetReceivingCountriesMutation,
  useGetIdentificationMutation,
  useGetAllCountriesMutation,
  useAddIdentificationMutation,
  useGetBeneficiariesMutation,
  useCreateBeneficiaryMutation,
  useGetTransactionsPurposesMutation,
  useInitiateTransactionMutation,
  usePayInitiateTransactionMutation,
  useGetDetailsbyReferenceNumberMutation,
} = bodyApi;

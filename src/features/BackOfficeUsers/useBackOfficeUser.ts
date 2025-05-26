import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface BackOfficeUser {
	id: number;
	email: string;
	avatar: string;
	first_name: string;
	last_name: string;
}

export interface BackOfficeUserRequest {
	id?: number;
	email: string;
	avatar?: string;
	first_name: string;
	last_name: string;
}

const API_URL = "https://reqres.in/api/users";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		accept: "application/json",
		"x-api-key": "reqres-free-v1",
	},
});

export const useBackOfficeUsers = (page = 1, limit = 6) => {
	return useQuery({
		queryKey: ["backOfficeUsers", page],
		queryFn: async () => {
			const response = await api.get("", {
				params: { page, per_page: limit },
			});
			return response.data;
		},
		placeholderData: (prevData) => prevData,
	});
};

import createBrowserClient from "@/libs/supabase/client";

const useStorage = () => {
	const supabase = createBrowserClient();

	const uploadFile = async (
		file: File,
		bucketName: string,
		path: string
	): Promise<string> => {
		const { data, error } = await supabase.storage
			.from(bucketName)
			.upload(path, file);
		if (error) {
			throw error;
		}

		return data.fullPath;
	};

	const downloadFile = async (
		bucketName: string,
		path: string
	): Promise<string> => {
		const { data, error } = await supabase.storage
			.from(bucketName)
			.download(path);
		if (error) {
			throw error;
		}
		return URL.createObjectURL(data);
	};

	const deleteFiles = async (bucketName: string, filePaths: string[]) => {
		const { error } = await supabase.storage
			.from(bucketName)
			.remove(filePaths);
		if (error) {
			throw error;
		}
	};

	return { downloadFile, uploadFile, deleteFiles };
};

export default useStorage;

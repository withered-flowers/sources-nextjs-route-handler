// ?? Di sini kita akan mencoba untuk menggunakan NextResponse sebagai
// ?? Pengganti dari Response yah
import { NextResponse } from "next/server";

// ?? Import fungsi dan type yang diperlukan dari `@/db/models/user.ts`
import { getUsers } from "@/db/models/user";

// ?? Ini adalah type definition dari Response yang dikembalikan
// ?? Ceritanya si developer ini ingin membuat kembalian Response yang sifatnya seragam
// ?? (Dibuat jadi general agar bisa digunakan di berbagai Response)
/*
  statusCode: number; <--- harus selalu ada statusCode
  message?: string; <--- optional
  data?: T; <--- optoinal dan berupa Generic Type
  error?: string; <--- optional
*/
type MyResponse<T> = {
	statusCode: number;
	message?: string;
	data?: T;
	error?: string;
};

// ?? Apabila ingin menggunakan typing kembalian dari query getUsers
// ?? Bisa menggunakan ini
// type TypeReturnedUsers = Awaited<ReturnType<typeof getUsers>>;

// !! GET /api/users
export const GET = async () => {
	// ?? Di sini kita akan menggunakan fungsi getUsers yang sudah kita buat
	const users = await getUsers();

	// ?? Di sini kita akan mulai untuk menggunakan NextResponse yang merupakan extend dari Response
	// ?? Keuntungan menggunakan NextResponse adalah kita bisa menuliskan kembalian Response dengan lebih presisi dengan Generic Type dan memiliki beberapa method tambahan yang tidak ada di Response.
	// ?? https://nextjs.org/docs/pages/api-reference/functions/next-server#nextresponse
	// ?? Misalnya di sini kita menuliskan bahwa Response yang akan dikembalikan adalah MyResponse yang mana memiliki Generic Type unknown untuk key "data"
	// ?? Kenapa unknown? Karena kita tidak tahu (dan tidak perlu tahu) kembalian dari getUsers
	// ?? NextResponse.json sudah method terakhir

	return NextResponse.json<MyResponse<unknown>>({
		statusCode: 200,
		message: "Pong from GET /api/users !",
		// ?? Di sini kita akan mengirimkan data users
		data: users,
	});
};

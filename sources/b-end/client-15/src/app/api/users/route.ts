// ?? Di sini kita akan mencoba untuk menggunakan NextResponse sebagai
// ?? Pengganti dari Response yah
import { NextResponse } from "next/server";

// ?? Import fungsi dan type yang diperlukan dari `@/db/models/user.ts`
import { getUsers } from "@/db/models/user";

import { createUser } from "@/db/models/user";
// ?? Step 5.1 - Import fungsi yang diperlukan
import type { NextRequest } from "next/server";

// ?? Import type yang dibutuhkan untuk kembalian Response
import type { MyResponse } from "@/app/api/types";

// ?? Apabila ingin menggunakan typing kembalian dari query getUsers bisa menggunakan ini
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

	// ?? TL;DR:
	// ?? NextResponse.json sudah method terakhir, mengembalikan Response dalam bentuk JSON, dan kita tidak memproses datanya lagi, sehingga unknown pun sudah cukup
	return NextResponse.json<MyResponse<unknown>>({
		statusCode: 200,
		message: "Pong from GET /api/users !",
		// ?? Di sini kita akan mengirimkan data users
		data: users,
	});
};

// ?? Step 5.2 Menambahkan fungsi HTTP Method yang baru
// !! POST /api/users
export const POST = async (
	// ?? Sekarang kita akan menggunakan NextRequest
	req: NextRequest,
	// !! Di sini kita tidak menggunakan dynamic route, sehingga tidak perlu params
) => {
	// ?? Step 5.3 Membaca data yang diberikan oleh client
	// ?? Asumsi:
	// ?? - data dari client berupa JSON
	const jsonData = await req.json(); // Perhatikan bahwa jsonData ini adalah "any"

	// ?? Apabila tidak ingin berasumsi, maka bisa dicek dari headers "Content-Type"
	// ?? Bila JSON = application/json
	// ?? Bila Form Standard = application/x-www-form-urlencoded
	// ?? Bila Form Data DIAWALI dengan multipart/form-data
	// !! (Khusus Form Data bukan SAMA DENGAN)

	/*
	const headerContentType = req.headers.get("Content-Type");
	
	if (headerContentType === "application/json") {
		// Bikin magic-nya di sini
	} else if (
		headerContentType === "application/x-www-form-urlencoded" ||
		headerContentType?.startsWith("multipart/form-data")
	) {
		// Bikin magic nya di sini
	}
	*/

	// ?? Data dari hasil terimaan JSON akan kita berikan ke fungsi createUser
	const result = await createUser(jsonData);

	// ?? Asumsinya data sudah berhasil diterima dan berhasil diproses, maka data akan bertambah
	// ?? Sehingga kembaliannya adalah 201
	return NextResponse.json<MyResponse<unknown>>(
		{
			statusCode: 201,
			data: result,
		},
		{
			status: 201,
		},
	);
};

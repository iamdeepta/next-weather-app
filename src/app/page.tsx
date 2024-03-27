import CustomerTable from "@/components/CustomerTable";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

const getCustomers = async () => {
  const response = await fetch(process.env.BASE_URL + "/api/customer");
  const data = await response.json();
  return data;
};

export default async function Home() {
  const { getUser } = getKindeServerSession();

  const user: KindeUser | null = await getUser();

  // console.log(user);

  const customers = await getCustomers();

  // console.log(customers);

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-24">
      <h1 className="text-2xl">Weather App</h1>
      <div className="flex justify-center gap-4">
        {!user ? (
          <>
            <LoginLink className="border-2 p-3 rounded">Sign in</LoginLink>
            <RegisterLink className="border-2 p-3 rounded">
              Sign up
            </RegisterLink>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4 w-[100%]">
              <div className="flex items-center justify-between">
                <LogoutLink className="border-2 p-2 rounded w-[100px]">
                  Log out
                </LogoutLink>

                <Link
                  href={"/customer"}
                  className="border-2 p-2 rounded w-[150px]"
                >
                  Create Customer
                </Link>
              </div>

              <CustomerTable customers={customers} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

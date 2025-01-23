"use client";

import { Field, Fieldset, Input, Label, Legend, Button } from "@headlessui/react";
import clsx from "clsx";
import { auth } from "@/_lib/auth";
import { useActionState } from "react";


export default function Auth() {
    const [state, action] = useActionState(auth, undefined); 

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <form action={action} className="w-full rounded-lg max-w-lg px-4">
                <Fieldset className="space-y-6 rounded-xl bg-white/5 flex justify-center items-center flex-col w-full p-6 sm:p-10">
                    <Legend className="text-2xl/7 italic text-center font-light text-slate-300">
                        simple-data
                    </Legend>
                    {state?.message && (
                        <p className="text-sm text-red-500">{state.message}</p>
                      )}
                    <Field className="w-full">
                        <Label className="text-sm/6 font-medium text-white">
                            Nome de usuário
                        </Label>
                        <Input
                            name="username"
                            placeholder="john.doe"
                            className={clsx(
                              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                        />
                    </Field>
                    <Field className="w-full">
                        <Label className="text-sm/6 font-medium text-white">
                            Email
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="john@doe.com"
                            className={clsx(
                              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                        />
                        {state?.errors?.email && (
                            <p className="text-sm text-red-500">{state.errors.email}</p>
                          )}
                    </Field>
                    <Field className="w-full">
                        <Label className="text-sm/6 font-medium text-white">
                            Senha
                        </Label>
                        <Input
                            type="password"
                            name="password"
                            className={clsx(
                              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                        />
                        {state?.errors?.password && (
                            <p className="text-sm text-red-500">{state.errors.password}</p>
                          )}
                    </Field>
                    <Button
                        type="submit"
                        className="flex justify-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white w-full"
                    >
                        Entrar
                    </Button>
                </Fieldset>
            </form>
        </div>
    );
}


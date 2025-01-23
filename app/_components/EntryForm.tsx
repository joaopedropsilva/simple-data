"use client";

import { CustomButton } from "@/_components/base/CustomButton";
import { Field, Input } from "@headlessui/react";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { saveEntryAction } from "@/_lib/entry";
import { redirect } from "next/navigation";


interface Field {
    id: string;
    name: string;
    value: string;
}

export interface EntryFormProps {
    entryId?: string;
    userId?: string;
    entryTitle: string;
    loadedFields: Field[];
}

export function EntryForm({ entryId, entryTitle, userId, loadedFields }: EntryFormProps) {
    const [fields, setFields] = useState<Field[]>(loadedFields);
    const [title, setTitle] = useState<string>(entryTitle);

    function handleAddField() {
        setFields([
            ...fields,
            { id: uuidV4(), name: "", value: "" }
        ]);
    }

    function handleChangeFieldData(fieldData: Field) {
        setFields((prevFields: Field[]) => {
            return prevFields
                .map(f => f.id === fieldData.id
                    ? { ...f, name: fieldData.name, value: fieldData.value }
                    : f
                )
        });
    }

    function handleRemoveFieldBy(id: string) {
        setFields(fields.filter(f => f.id !== id));
    }

    function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();

        if (!userId)
            return;

        type EntryExpectedSchema = {
            id: string;
            user_id: string;
            name: string;
            fields: {
                name: string;
                value: string;
            }[];
        };
        const entryData: EntryExpectedSchema = {
            id: entryId ?? uuidV4(),
            user_id: userId,
            name: title,
            fields: fields
        };

        saveEntryAction(entryData);

        redirect("/");
    }

    function handleResetForm() {
        setTitle("New Entry");
        setFields([]);

        redirect(`/entry?user=${userId}`);
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="mt-16 w-[500px] bg-slate-800 rounded-lg"
        >
            <div className="w-full p-2">
                <Field className="w-full mb-1">
                    <Input
                        required
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-transparent w-full border-none text-xl p-1 text-slate-300 font-bold focus:outline-none data-[focus]:outline-1 data-[focus]:outline-offset-2 data-[focus]:outline-white/25 rounded-md"
                    />
                </Field>
                <div className="w-full rounded-md bg-slate-700 flex flex-col items-center justify-center p-1 my-2">
                    {
                        fields.map(({ id, name, value }, index) => (
                            <div
                                key={`input-group-${index}`}
                                className="w-full flex gap-2 p-1"
                            >
                                <Field className="w-4/12">
                                    <Input
                                        required
                                        name="field"
                                        placeholder="field"
                                        value={name}
                                        onChange={(e) => handleChangeFieldData({ id, name: e.target.value, value })}
                                        className="bg-slate-800 w-full border-none text-md p-2 text-slate-300 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-offset-1 data-[focus]:outline-white/25 rounded-md"
                                    />
                                </Field>
                                <Field className="w-4/12">
                                    <Input
                                        name="fvalue"
                                        placeholder="value"
                                        value={value}
                                        onChange={(e) => handleChangeFieldData({ id, name, value: e.target.value })}
                                        className="bg-slate-800 w-full border-none text-md p-2 text-slate-300 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-offset-1 data-[focus]:outline-white/25 rounded-md"
                                    />
                                </Field>
                                <div className="w-4/12 flex items-center">
                                    <CustomButton 
                                        colorAccent={800}
                                        type="button"
                                        onClick={() => handleRemoveFieldBy(id)}
                                        icon={<TrashIcon className="size-4 fill-red-600"/>}
                                    />
                                </div>
                            </div>
                        ))
                    }
                    <CustomButton
                        type="button"
                        onClick={handleAddField}
                        icon={<PlusIcon className="size-4 fill-slate-300"/>}
                    />
                </div>
                <div className="w-full flex items-center justify-center gap-2 mt-1 relative">
                    <CustomButton
                        type="submit"
                        text="Salvar"
                    />
                    <CustomButton 
                        type="button"
                        onClick={handleResetForm}
                        icon={<TrashIcon className="size-4 fill-red-600"/>}
                        spanOver="right"
                    />
                </div>
            </div>
        </form>
  );
}


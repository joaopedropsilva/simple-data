"use client";

import { CustomButton } from "@/_components/base/CustomButton";
import { Field, Input } from "@headlessui/react";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { saveEntryAction } from "@/_lib/entry";


export function EntryForm({ entryId }: { entryId: string }) {
    // TENTAR NÃO TRABALHAR COM ID
    const [fields, setFields] = useState<{ id: string; name: string; }[]>([]);
    
    function handleAddField() {
        setFields([
            ...fields,
            { id: uuidV4(), name: "" }
        ]);
    }

    function handleRemoveFieldBy(id: string) {
        setFields(fields.filter(f => f.id !== id));
    }

    function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();

        type EntryFormFieldsOnDOM = {
            title: { value: string };
            field: any;
            fvalue: any;
        }
        const target = event.target as typeof event.target & EntryFormFieldsOnDOM;
        const fieldsOnDOM =
            typeof target.field.forEach !== "function"
                ? [target.field]
                : [...target.field];
        const fvaluesOnDOM =
            typeof target.fvalue.forEach !== "function"
                ? [target.fvalue]
                : [...target.fvalue];

        type EntryExpectedSchema = {
            id: string;
            name: string;
            fields: {
                name: string;
                value: string;
            }[];
        };
        const entryData: EntryExpectedSchema = {
            id: entryId,
            name: target.title.value,
            fields: [] 
        };

        fieldsOnDOM.forEach((f: any, index: number) => {
            entryData.fields.push({
                name: f.value,
                value: fvaluesOnDOM[index].value
            } );
        });

        saveEntryAction(entryData);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-16 w-[500px] bg-slate-800 rounded-lg"
        >
            <div className="w-full p-2">
                <Field className="w-full flex justify-center mb-1">
                    <Input
                        required
                        type="text"
                        name="title"
                        className="bg-transparent w-max border-none text-xl p-1 text-slate-300 font-bold focus:outline-none data-[focus]:outline-1 data-[focus]:outline-offset-2 data-[focus]:outline-white/25 rounded-md"
                        defaultValue="New Entry"
                    />
                </Field>
                <div className="w-full rounded-md bg-slate-700 flex flex-col items-center justify-center p-1 my-2">
                    {
                        fields.map(({ id, name }, index) => (
                            <div
                                key={`input-group-${index}`}
                                className="w-full flex gap-2 p-1"
                            >
                                <Field className="w-4/12">
                                    <Input
                                        required
                                        name="field"
                                        placeholder="field"
                                        defaultValue={name}
                                        className="bg-slate-800 w-full border-none text-md p-2 text-slate-300 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-offset-1 data-[focus]:outline-white/25 rounded-md"
                                    />
                                </Field>
                                <Field className="w-4/12">
                                    <Input
                                        name="fvalue"
                                        placeholder="value"
                                        defaultValue=""
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
                        text="Criar"
                    />
                    <CustomButton 
                        type="reset"
                        icon={<TrashIcon className="size-4 fill-red-600"/>}
                        spanOver="right"
                    />
                </div>
            </div>
        </form>
  );
}


"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError } from "@/components/ui/field";
import { FileInput } from "@/components/ui/file-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminCreateTicketMutation } from "@/redux/features/admin/ticketApis";
import { useForm } from "@tanstack/react-form";

import { Textarea } from "@/components/ui/textarea";
import { ITicketStatus, TicketStatusEnum } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const CreateTicketSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  event_date: z
    .string()
    .refine((val) => !Number.isNaN(Date.parse(val)), "Invalid event date")
    .refine(
      (val) => new Date(val) >= new Date(new Date().toDateString()),
      "Event date cannot be in the past",
    ),
  location: z.string().min(3),
  about: z.string().min(10),
  ticket_price: z.coerce.number().positive(),
  sold_limit: z.coerce.number().positive(),
  ticket_status: TicketStatusEnum,
  included: z
    .string()
    .min(3, { error: "Please include at least one benefit or feature" }),
  is_active: z.boolean(),
  thumbnail: z
    .custom<File>()
    .refine((file) => file instanceof File, "Thumbnail is required"),
});

export default function CreateEventTicketDialog({
  children,
}: React.PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [createTicket, { isLoading: creating }] =
    useAdminCreateTicketMutation();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      about: "",
      ticket_price: "",
      sold_limit: "",
      event_date: "",
      location: "",
      ticket_status: "General" as ITicketStatus,
      included: "",
      is_active: true,
      thumbnail: undefined as File | undefined,
    },
    validators: {
      onSubmit: CreateTicketSchema,
    },
    onSubmit: async ({ value }) => {
      if (value.thumbnail === undefined) {
        return;
      }

      const includedArray = (value.included || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      try {
        await createTicket({
          ...value,
          ticket_price: Number(value.ticket_price),
          sold_limit: Number(value.sold_limit),
          thumbnail: value.thumbnail!,
          included: includedArray,
        }).unwrap();

        toast.success("Ticket created successfully");
        form.reset();
        setOpen(false);
      } catch (err) {
        console.log(err);
        toast.error("Failed to create ticket");
      }
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) form.reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-card sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Event Ticket</DialogTitle>
          <DialogDescription>
            Create and publish a new event ticket.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="grid gap-5"
        >
          <form.Field name="title">
            {(field) => (
              <Field
                data-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              >
                <Label htmlFor={field.name}>Event Title</Label>
                <Input
                  placeholder="Enter a title"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <Field
                data-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              >
                <Label htmlFor={field.name}>Short Description</Label>
                <Input
                  placeholder="Enter a description"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="about">
            {(field) => (
              <Field
                data-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              >
                <Label htmlFor={field.name}>About</Label>
                <Textarea
                  className="min-h-30"
                  placeholder="Write about the event"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          {/* Thumbnail */}
          <form.Field name="thumbnail">
            {(field) => (
              <Field
                data-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              >
                <Label htmlFor={field.name}>Event Ticke Thumbnail</Label>
                <FileInput
                  id={field.name}
                  multiple={false}
                  accept="image/*"
                  onBlur={field.handleBlur}
                  onChange={(files) => field.handleChange(files[0])}
                />

                {/* Existing image preview (edit mode) */}
                {/* {gettingEditModeInitialData || */}
                {/* (!field.state.value && editModeCoinData?.thumbnail) ? ( */}
                {/*   <> */}
                {/*     <h3 className="font-body mt-4 mb-1 text-sm"> */}
                {/*       Current thumbnail */}
                {/*     </h3> */}
                {/*     <div className="bg-accent-light-gray border-border flex items-center justify-between space-x-4 rounded-lg border p-3"> */}
                {/*       <Image */}
                {/*         unoptimized */}
                {/*         width={64} */}
                {/*         height={64} */}
                {/*         src={editModeCoinData?.thumbnail as string} */}
                {/*         alt="" */}
                {/*         className="bg-muted size-16 rounded border object-cover" */}
                {/*       /> */}
                {/*     </div> */}
                {/*   </> */}
                {/* ) : null} */}

                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          {/* Date & Location */}
          <div className="grid grid-cols-2 gap-4">
            <form.Field name="location">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <Label htmlFor={field.name}>Location</Label>
                  <Input
                    placeholder="Ex: San Francisco, CA"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="event_date">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <Label htmlFor={field.name}>Event Date</Label>
                  <Input
                    id={field.name}
                    type="date"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </div>

          {/* Ticketing */}
          <div className="grid grid-cols-2 gap-4">
            <form.Field name="ticket_price">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <Label htmlFor={field.name}>Ticket Price</Label>
                  <Input
                    placeholder="Enter ticket price"
                    type="number"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="sold_limit">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <Label htmlFor={field.name}>Total Capacity</Label>
                  <Input
                    placeholder="Ex: 500"
                    type="number"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="ticket_status">
              {(field) => (
                <Field>
                  <Label>Ticket Status</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(v: ITicketStatus) => field.handleChange(v)}
                  >
                    <SelectTrigger className="h-14!">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="VIP">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            </form.Field>

            <form.Field name="included">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <Label>Included features</Label>
                  <Input
                    placeholder="3 day event, All keynote sessions, Workshop participation"
                    value={field.state.value}
                    id={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </div>

          {/* Visibility */}
          <form.Field name="is_active">
            {(field) => (
              <div className="flex items-center gap-3">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(v) => field.handleChange(Boolean(v))}
                />
                <Label htmlFor={field.name}>Active bundle</Label>
              </div>
            )}
          </form.Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" size="lg" variant="primary-inverse">
                Cancel
              </Button>
            </DialogClose>
            <Button
              size="lg"
              variant="primary"
              type="submit"
              disabled={creating}
            >
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

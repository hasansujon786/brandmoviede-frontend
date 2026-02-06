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
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/lib/utils";
import {
  useAdminCreateTicketMutation,
  useAdminGetTicketByIdQuery,
  useAdminUpdateTicketMutation,
} from "@/redux/features/admin/ticketApis";
import { IAdminSingleTicket, ITicketStatus, TicketStatusEnum } from "@/types";
import { skipToken } from "@reduxjs/toolkit/query";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

/* ---------------------------------- */
/* Zod Schemas */
/* ---------------------------------- */
const baseSchema = {
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
  ticket_price: z.coerce.number<string>().positive(),
  sold_limit: z.coerce.number<string>().positive(),
  ticket_status: TicketStatusEnum,
  included: z.string().min(3, "Please include at least one benefit or feature"),
  is_active: z.boolean(),
};

const createSchema = z.object({
  ...baseSchema,
  thumbnail: z
    .instanceof(File, { message: "Thumbnail is required" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Thumbnail must be an image",
    }),
});

const updateSchema = z.object({
  ...baseSchema,
  thumbnail: z.custom<File | undefined>(),
});

interface EventTicketDialogProps extends React.PropsWithChildren {
  mode: "create" | "edit";
  initialValues?: Partial<IAdminSingleTicket>;
}

export default function CreateEventTicketDialog({
  children,
  mode = "create",
  initialValues,
}: EventTicketDialogProps) {
  const [open, setOpen] = useState(false);

  const ticketId = open ? initialValues?.id : undefined;
  const { data: editModeTicketData, isLoading: gettingEditModeInitialData } =
    useAdminGetTicketByIdQuery(ticketId ?? skipToken);

  const [createTicket, { isLoading: creating }] =
    useAdminCreateTicketMutation();
  const [updateTicket, { isLoading: updating }] =
    useAdminUpdateTicketMutation();

  const getFormDefaultValues = () => {
    const data = editModeTicketData ?? initialValues;

    // Format date from ISO string (2026-01-30T00:00:00.000Z) to YYYY-MM-DD
    const formatDateForInput = (dateString?: string) => {
      if (!dateString) return "";
      return dateString.split("T")[0];
    };

    return {
      title: data?.title ?? "",
      description: data?.description ?? "",
      about: data?.about ?? "",
      ticket_price: data?.ticket_price?.toString() ?? "",
      sold_limit: data?.sold_limit?.toString() ?? "",
      event_date: formatDateForInput(data?.event_date),
      location: data?.location ?? "",
      ticket_status: (data?.ticket_status ?? "General") as ITicketStatus,
      included: data?.included?.join(", ") ?? "",
      is_active: data?.status == "Inactive" ? false : true,
      thumbnail: undefined as File | undefined,
    };
  };

  const form = useForm({
    defaultValues: getFormDefaultValues(),
    validators: {
      onSubmit: mode === "create" ? createSchema : updateSchema,
    },
    onSubmit: async ({ value }) => {
      const includedArray = (value.included || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      try {
        if (mode === "create") {
          await createTicket({
            title: value.title,
            description: value.description,
            about: value.about,
            ticket_price: Number(value.ticket_price),
            sold_limit: Number(value.sold_limit),
            event_date: value.event_date,
            location: value.location,
            ticket_status: value.ticket_status,
            included: includedArray,
            is_active: value.is_active,
            thumbnail: value.thumbnail!, // safe: createSchema guarantees it
          }).unwrap();

          toast.success("Event ticket created successfully");
        } else {
          if (!ticketId) throw new Error("Ticket Id not found");

          await updateTicket({
            id: ticketId,
            title: value.title,
            description: value.description,
            about: value.about,
            ticket_price: Number(value.ticket_price),
            sold_limit: Number(value.sold_limit),
            event_date: value.event_date,
            location: value.location,
            ticket_status: value.ticket_status,
            included: includedArray,
            is_active: value.is_active,
            thumbnail: value.thumbnail, // optional
          }).unwrap();

          toast.success("Event ticket updated successfully");
        }

        form.reset();
        setOpen(false);
      } catch (err) {
        const msg =
          mode === "create"
            ? "Failed to create event ticket"
            : "Failed to update event ticket";
        toast.error(getErrorMessage(err, msg));
      }
    },
  });

  const isSubmitting =
    form.state.isSubmitting ||
    creating ||
    updating ||
    gettingEditModeInitialData;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) form.reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-card custom-scrollbar grid max-h-[calc(100svh-40px)] gap-5 overflow-y-scroll sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Event Ticket" : "Update Event Ticket"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create and publish a new event ticket"
              : "Update event ticket details"}
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
                <Label htmlFor={field.name}>Event Ticket Thumbnail</Label>
                <FileInput
                  id={field.name}
                  multiple={false}
                  accept="image/*"
                  onBlur={field.handleBlur}
                  onChange={(files) => field.handleChange(files[0])}
                />

                {/* Existing image preview (edit mode) */}
                {gettingEditModeInitialData ||
                (!field.state.value && editModeTicketData?.thumbnail) ? (
                  <>
                    <h3 className="font-body mt-4 mb-1 text-sm">
                      Current thumbnail
                    </h3>
                    <div className="bg-accent-light-gray border-border flex items-center justify-between space-x-4 rounded-lg border p-3">
                      <Image
                        unoptimized
                        width={64}
                        height={64}
                        src={editModeTicketData?.thumbnail as string}
                        alt=""
                        className="bg-muted size-16 rounded border object-cover"
                      />
                    </div>
                  </>
                ) : null}

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
                <Label htmlFor={field.name}>Active ticket</Label>
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
              disabled={isSubmitting}
            >
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : gettingEditModeInitialData
                    ? "Fetcing data.."
                    : "Updating..."
                : mode === "create"
                  ? "Create Event"
                  : "Update Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

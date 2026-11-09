import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAdminAuth } from './AdminAuthContext';
import { PageEditSheet } from './PageEditSheet';
import type { EditablePageId } from './pageEditorUtils';

interface AdminPageEditButtonProps {
  page: EditablePageId;
}

export function AdminPageEditButton({ page }: AdminPageEditButtonProps) {
  const { token } = useAdminAuth();
  const [open, setOpen] = useState(false);

  if (!token) return null;

  return (
    <>
      <div className="mx-auto max-w-[90rem] px-6 pt-4 md:px-10 lg:px-16">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded border border-terracotta/40 bg-terracotta/10 px-4 py-2 text-[0.65rem] font-semibold tracking-[0.25em] text-terracotta uppercase transition-colors hover:bg-terracotta/20"
        >
          Edit this page
        </button>
      </div>
      <AnimatePresence>
        {open && <PageEditSheet page={page} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

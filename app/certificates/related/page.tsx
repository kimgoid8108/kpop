"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { CertificateRelatedList } from "../../../components/certificates/CertificateRelatedList";
import { certificates } from "../../../lib/certificates";

export default function CertificatesRelatedPage() {
  return (
    <PageLayout>
      <div className="w-full overflow-x-hidden">
        <CertificateRelatedList certificates={certificates} />
      </div>
    </PageLayout>
  );
}

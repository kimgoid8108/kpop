"use client";

import React from "react";
import { PageLayout } from "../../components/PageLayout";
import { CertificateList } from "../../components/certificates/CertificateList";
import { certificates } from "../../lib/certificates";

export default function CertificatesPage() {
  return (
    <PageLayout>
      <div className="w-full overflow-x-hidden">
        <CertificateList certificates={certificates} />
      </div>
    </PageLayout>
  );
}

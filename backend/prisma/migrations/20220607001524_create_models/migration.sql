-- CreateTable
CREATE TABLE "Presentation" (
    "id" SERIAL NOT NULL,
    "presentation" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "room" INTEGER NOT NULL,
    "speakerId" INTEGER NOT NULL,

    CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendee" (
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Attendee_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "AttendeesOnPresentation" (
    "attendeeId" TEXT NOT NULL,
    "presentationId" INTEGER NOT NULL,
    "registered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttendeesOnPresentation_pkey" PRIMARY KEY ("attendeeId","presentationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Presentation_speakerId_key" ON "Presentation"("speakerId");

-- AddForeignKey
ALTER TABLE "Presentation" ADD CONSTRAINT "Presentation_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendeesOnPresentation" ADD CONSTRAINT "AttendeesOnPresentation_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendeesOnPresentation" ADD CONSTRAINT "AttendeesOnPresentation_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

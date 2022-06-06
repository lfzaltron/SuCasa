-- CreateTable
CREATE TABLE "Presentation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "presentation" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "room" INTEGER NOT NULL,
    "speakerId" INTEGER NOT NULL,
    CONSTRAINT "Presentation_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speaker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Attendee" (
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "AttendeesOnPresentation" (
    "attendeeId" TEXT NOT NULL,
    "presentationId" INTEGER NOT NULL,
    "registered" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("attendeeId", "presentationId"),
    CONSTRAINT "AttendeesOnPresentation_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AttendeesOnPresentation_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Presentation_speakerId_key" ON "Presentation"("speakerId");
